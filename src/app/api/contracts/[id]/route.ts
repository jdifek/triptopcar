import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const contract = await prisma.contracts.update({
      where: { id: parseInt(params.id) },
      data,
    })
    return NextResponse.json(contract)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contract' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const contract = await prisma.contracts.delete({
      where: { id: parseInt(params.id) },
    })
    return NextResponse.json(contract)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete contract' },
      { status: 500 }
    )
  }
}
