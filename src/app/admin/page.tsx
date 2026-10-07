"use client";

import React, { useState } from "react";
import { useAdmin, AdminOrder } from "@/context/AdminContext";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar, AdminTab } from "@/components/admin/AdminSidebar";
import { DashboardTab } from "@/components/admin/DashboardTab";
import { ProductsTab } from "@/components/admin/ProductsTab";
import { OrdersTab } from "@/components/admin/OrdersTab";
import { ClientsTab } from "@/components/admin/ClientsTab";
import { BannersTab } from "@/components/admin/BannersTab";
import { SettingsTab } from "@/components/admin/SettingsTab";

export default function AdminPage() {
  const { isAdminAuthenticated } = useAdmin();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<AdminOrder | null>(null);

  // Se não estiver logado como administrador, exibe tela de login dedicada
  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const handleSelectOrderFromDashboard = (order: AdminOrder) => {
    setSelectedOrderForDetails(order);
    setActiveTab("pedidos");
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col md:flex-row font-sans selection:bg-am-magenta selection:text-white">
      {/* Sidebar de Navegação */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Área Central de Conteúdo */}
      <main className="flex-1 overflow-y-auto max-h-screen p-4 sm:p-6 lg:p-8 bg-zinc-50">
        {activeTab === "dashboard" && (
          <DashboardTab
            setActiveTab={setActiveTab}
            onSelectOrder={handleSelectOrderFromDashboard}
          />
        )}

        {activeTab === "produtos" && <ProductsTab />}

        {activeTab === "pedidos" && (
          <OrdersTab initialSelectedOrder={selectedOrderForDetails} />
        )}

        {activeTab === "clientes" && <ClientsTab />}

        {activeTab === "banners" && <BannersTab />}

        {activeTab === "configuracoes" && <SettingsTab />}
      </main>
    </div>
  );
}
