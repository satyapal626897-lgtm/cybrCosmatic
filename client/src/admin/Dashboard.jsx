import { useAuth } from "../context/AuthContext";
import "../css/Admin.css";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: "Total Sales", value: "₹1,24,500", icon: "💰", trend: "+12.5%" },
    { title: "Total Products", value: "128", icon: "💄", trend: "0.0%" },
    { title: "New Customers", value: "15", icon: "👥", trend: "+8.1%" },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header" style={{ marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem' }}>Welcome back, {user?.name || "Satya"}! </h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your store today.</p>
        </div>
        <button className="btn-primary" style={{ padding: '12px 24px' }}>Download Report</button>
      </div>

      <div className="admin-form-grid" style={{ marginBottom: '40px' }}>
        {stats.map((stat, index) => (
          <div key={index} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.5rem', background: 'var(--accent)', padding: '15px', borderRadius: '15px' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '5px' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{stat.value}</h3>
              <span style={{ color: stat.trend.startsWith('+') ? '#27ae60' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                {stat.trend} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>vs last week</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
