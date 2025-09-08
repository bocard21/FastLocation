# VFX Slate MVP

Minimal Next.js + Node project for generating a Netflix-style slate and overlay on top of
video or image files. This repository is a proof of concept and implements a very small
subset of the workflow described in the original specification.

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

Empty `.gitkeep` files keep these directories in git.

Replace `assets/template.psd` with your own PSD following the layer name map described in
the project documentation. Layer names in `lib/psd.ts` show where text replacement occurs.

## Building

```bash
npm run build && npm run start
```

The `/api/export` route returns the processed media as a file download. Video export uses
ffmpeg to prepend a 1-frame slate and optionally composite an overlay image. The
implementation is intentionally simplified and does not aim for codec preservation or
robust error handling.
