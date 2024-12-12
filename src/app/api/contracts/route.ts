import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const contracts = await prisma.contracts.findMany()
    return NextResponse.json(contracts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contracts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const contract = await prisma.contracts.create({ data })
    return NextResponse.json(contract)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create contract' },
      { status: 500 }
    )
  }
}
