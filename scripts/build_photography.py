"""Build web previews from an explicitly reviewed original-photo inventory.

Usage: python scripts/build_photography.py --audit-dir PATH [--prepare-only]
Requires Pillow. The audit directory is private/local and is NOT published.
Originals are never resized, re-encoded or overwritten. RAW files may supply
a byte-extracted camera JPEG in previewSource, with the RAW separately linked.
"""
import argparse
import base64
from concurrent.futures import ThreadPoolExecutor
import hashlib
import io
import json
from pathlib import Path
import random
from PIL import Image, ImageOps, ImageCms

SITE = Path(__file__).resolve().parents[1]
RELEASE = 'https://github.com/Garry-Tang-274/Garry-Tang-274.github.io/releases/download/gallery-originals-20260927/'
TAGS = {'portrait', 'culture', 'landscape', 'minimal', 'urban', 'nature', 'documentary', 'military'}

def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(4 * 1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--audit-dir', type=Path, required=True)
    parser.add_argument('--prepare-only', action='store_true')
    args = parser.parse_args()
    audit = args.audit_dir.resolve()
    rows = json.loads((audit / 'canonical.json').read_text(encoding='utf-8'))
    dest = SITE / 'assets/photography/gallery'
    dest.mkdir(parents=True, exist_ok=True)
    uploads, prepared = [], []
    for row in rows:
        source = Path(row.get('previewSource') or row['path'])
        identifier = 'photo-' + row['sha256'][:16]
        suffix = source.suffix.lower()
        asset_name = identifier + suffix
        info = {'sourceId': row['id'], 'id': identifier, 'source': str(source),
                'source_sha256': row['sha256'], 'group': 'military' if row['group'] == 'military' else '',
                'original': row.get('url') or RELEASE + asset_name,
                'originalBytes': source.stat().st_size,
                'original_sha256': sha(source) if row.get('raw') else row['sha256'],
                'memberIds': row['memberIds']}
        if not row.get('url'):
            uploads.append({'source': str(source), 'name': asset_name, 'sha256': info['original_sha256']})
        if row.get('raw'):
            raw_name = identifier + '.nef'
            info['rawOriginal'] = RELEASE + raw_name
            info['raw_sha256'] = row['sha256']
            uploads.append({'source': row['path'], 'name': raw_name, 'sha256': row['sha256']})
        prepared.append(info)
    assert len({p['id'] for p in prepared}) == len(prepared), 'Duplicate catalogue identifiers'
    assert len({p['name'] for p in uploads}) == len(uploads), 'Duplicate attachment names'
    (audit / 'upload-plan.json').write_text(json.dumps(uploads, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'uploadPlan': len(uploads), 'catalogue': len(prepared), 'bytes': sum(Path(p['source']).stat().st_size for p in uploads)}), flush=True)

    def preview(info):
        source = Path(info['source'])
        assert sha(source) == info['original_sha256'], 'Source changed: ' + info['sourceId']
        with Image.open(source) as opened:
            icc = opened.info.get('icc_profile')
            image = ImageOps.exif_transpose(opened).convert('RGB')
            if icc:
                try:
                    image = ImageCms.profileToProfile(image, ImageCms.ImageCmsProfile(io.BytesIO(icc)), ImageCms.createProfile('sRGB'), outputMode='RGB')
                except (OSError, ValueError):
                    pass
            info['width'], info['height'] = image.size
            colour = image.resize((1, 1)).getpixel((0, 0))
            info['color'] = '#%02x%02x%02x' % colour
            for field, box, quality, label in [('thumb', (640, 960), 76, '640'), ('preview', (1600, 1600), 84, '1600')]:
                output = dest / (info['id'] + '-' + label + '.webp')
                if not output.exists():
                    small = image.copy()
                    small.thumbnail(box, Image.Resampling.LANCZOS)
                    small.save(output, 'WEBP', quality=quality, method=4)
                info[field] = '/' + output.relative_to(SITE).as_posix()
                with Image.open(output) as derivative:
                    info[field + 'Width'], info[field + 'Height'] = derivative.size
            tiny = image.copy()
            tiny.thumbnail((24, 24), Image.Resampling.LANCZOS)
            buffer = io.BytesIO()
            tiny.save(buffer, 'WEBP', quality=35, method=4)
            info['placeholder'] = 'data:image/webp;base64,' + base64.b64encode(buffer.getvalue()).decode('ascii')
        return info
    with ThreadPoolExecutor(max_workers=4) as pool:
        complete = []
        for info in pool.map(preview, prepared):
            complete.append(info)
            if len(complete) % 25 == 0:
                print(json.dumps({'previews': len(complete), 'total': len(prepared)}), flush=True)
    (audit / 'prepared.json').write_text(json.dumps(complete, ensure_ascii=False, indent=2), encoding='utf-8')
    if args.prepare_only:
        return
    annotations = {}
    for source in audit.glob('annotations-*.json'):
        annotations.update(json.loads(source.read_text(encoding='utf-8')))
    for source in audit.glob('annotations-*.txt'):
        for line in source.read_text(encoding='utf-8').splitlines():
            if not line.strip() or line.startswith('#'):
                continue
            identifier, tags, alt = line.split('|')
            annotations[identifier] = {'tags': tags.split(','), 'alt': alt}
    missing = [row['sourceId'] for row in complete if row['sourceId'] not in annotations]
    assert not missing, 'Missing visual review: ' + ', '.join(missing)
    for row in complete:
        annotation = annotations[row['sourceId']]
        row.update(annotation)
        assert row['tags'] and set(row['tags']) <= TAGS and len(row['alt']) > 3
        if row['group'] == 'military':
            assert 'military' in row['tags']
    # One stable shuffle: filters keep the same relative order, and returning
    # from a photograph never moves its neighbours. Military stays one block.
    ordinary = [row for row in complete if row['group'] != 'military']
    military = [row for row in complete if row['group'] == 'military']
    random.Random(20260927).shuffle(ordinary)
    ordered = ordinary[:36] + military + ordinary[36:]
    public = [{k: v for k, v in row.items() if k not in {'source', 'sourceId', 'memberIds'}} for row in ordered]
    (SITE / '_data/photography.json').write_text(json.dumps(public, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    (audit / 'catalogue-mapping.json').write_text(json.dumps(ordered, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'publishedCatalogue': len(public), 'military': len(military), 'tags': {t: sum(t in p['tags'] for p in public) for t in sorted(TAGS)}, 'previewBytes': sum(p.stat().st_size for p in dest.iterdir())}), flush=True)

if __name__ == '__main__':
    main()
