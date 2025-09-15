# Shopify Data Ingestion & Insights Service 🚀

This project is my submission for the **Xeno FDE Internship Assignment – 2025**.  
It demonstrates a **multi-tenant Shopify data ingestion service** with an **insights dashboard**.

Live: https://shopify-insights-service.vercel.app/
https://shopify-insights-service-git-main-apurav-swamis-projects.vercel.app/
---

## ✨ Features
- **Multi-tenant support** → Each store’s data is isolated using tenant identifiers.
- **Shopify Integration** → Customers, Orders, and Products are ingested via Shopify APIs.
- **Database Storage** → Data persisted in **PostgreSQL** (can be swapped with MySQL).
- **Insights Dashboard** → Simple UI to visualize:
  - Total customers, orders, and revenue
  - Orders by date (with filters)
  - Top 5 customers by spend
- **Authentication** → Email login for accessing the dashboard.
- **Deployment** → Live on [Vercel](#deployment).

---

## 🛠️ Tech Stack
- **Backend**: Node.js (Express.js) / Next.js API Routes  
- **Frontend**: Next.js + Chart.js/Recharts  
- **Database**: PostgreSQL  
- **ORM**: Prisma  
- **Deployment**: Vercel  

---

## ⚙️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
