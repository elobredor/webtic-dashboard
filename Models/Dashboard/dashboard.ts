export interface MetricCardProps {
    icon: React.ElementType;
    title: string;
    value: string;
    color: 'green' | 'blue' | 'yellow' | 'purple';
  }
  
  export interface TotalCardProps {
    title: string;
    value: string;
    items: { label: string; value: string }[];
  }
  
  export interface ProfileCardProps {
    name?: string;
    phone?: string;
    birthday?: string;
    position: string;
    img: string;
  }
  
  export interface Order {
    id: string;
    date: string;
    type: string;
    buyer: string;
    status: 'Completo' | 'Pendiente';
    payment: string;
    amount: string;
  }
  
  