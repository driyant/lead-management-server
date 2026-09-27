Backend Requirements: Lead Management API

This document outlines the requirements and specifications for the backend portion of the Lead Management assessment.

1. Tech Stack

Runtime: Node.js

Framework: Express.js

Language: TypeScript

ORM: Prisma

Database: PostgreSQL

Package Manager: pnpm

2. Database Schema

The database must store lead information. Using Prisma, the Lead model should be defined as follows:

id: String (UUID), Primary Key

name: String, Required

email: String, Required, Unique

status: Enum, Required (Allowed values: "New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"). Default value: "New".

createdAt: DateTime (Timestamp), automatically set to the current time.

3. REST API Endpoints

The API must expose the following two main endpoints:

A. Fetch All Leads

Route: GET /leads

Action: Retrieve all leads from the database.
