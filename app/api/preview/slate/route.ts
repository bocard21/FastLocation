import { NextRequest, NextResponse } from 'next/server';
import { slateSchema } from '../../../../lib/validators';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { fields } = await req.json();
  slateSchema.parse(fields);
  return NextResponse.json({ ok: true });
}
