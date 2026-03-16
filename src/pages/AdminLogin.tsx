import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Attempting login with:", email);

    // Check if credentials match the fixed admin credentials
    if (email !== "rahmanhafizur31928@gmail.com" || password !== "Rahman@443") {
      console.log("Invalid credentials");
      toast.error("Invalid credentials");
      setLoading(false);
      return;
    }

    console.log("Credentials valid, checking admin_users table...");

    try {
      // Check if admin user exists in admin_users table
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .eq("is_active", true)
        .maybeSingle();

      console.log("Admin data:", adminData);
      console.log("Admin error:", adminError);

      if (adminError) {
        console.error("Database error:", adminError);
        toast.error("Database error: " + adminError.message);
        setLoading(false);
        return;
      }

      if (!adminData) {
        console.error("Admin user not found");
        toast.error("Access denied. Admin privileges required.");
        setLoading(false);
        return;
      }

      console.log("Login successful!");
      
      // Set authentication flag in localStorage
      localStorage.setItem('admin_authenticated', 'true');
      
      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Portfolio
        </a>

        <div className="glass rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Admin Login</h1>
              <p className="text-xs text-muted-foreground">Sign in to manage your portfolio</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full glass rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full glass rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm hover:brightness-110 transition-all glow disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
