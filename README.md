# VFX Slate MVP

Minimal Next.js + Node project for generating a Netflix-style slate and overlay on top of
video or image files. This repository is only a proof of concept and many features are
placeholders.

## Requirements

- Node.js 18+
- ffmpeg and ffprobe installed and available in `$PATH`
- (optional) set custom paths in `.env.local`

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

`uploads/` stores incoming files while `work/<jobId>/` contains intermediate assets like
`slate.png`, `overlay.png` and exported media.

Replace `assets/template.psd` with your own PSD following the layer name map described in
the project documentation. Layer names in `lib/psd.ts` show where text replacement occurs.

## Building

```bash
npm run build && npm run start
```

This project does not implement production-ready video handling; see `lib/ffmpeg.ts` for
example commands on how to combine slate, overlay and original media using ffmpeg.
