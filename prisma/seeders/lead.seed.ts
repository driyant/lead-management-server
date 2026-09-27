import { LeadStatus, type PrismaClient } from "@prisma/client";

export async function seedLeads(prisma: PrismaClient) {
  const leads = [
    {
      name: "Andi Pratama",
      email: "andi@example.com",
      status: LeadStatus.NEW,
    },
    {
      name: "Claudia Wijaya",
      email: "claudia@example.com",
      status: LeadStatus.ENGAGED,
    },
    {
      name: "Citra Lestari",
      email: "citra@example.com",
      status: LeadStatus.PROPOSAL_SENT,
    },
  ];

  for (const lead of leads) {
    await prisma.lead.upsert({
      where: { email: lead.email },
      update: {
        name: lead.name,
        status: lead.status,
      },
      create: lead,
    });
  }
}