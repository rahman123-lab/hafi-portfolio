import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  Plus,
  Trash2,
  Edit,
  Upload,
} from "lucide-react";

type Tab = "overview" | "projects" | "certificates" | "messages" | "profile";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by checking if we have a valid session
    // Since we're using fixed credentials, we'll use localStorage to track login state
    const isLoggedIn = localStorage.getItem('admin_authenticated') === 'true';
    if (!isLoggedIn) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem('admin_authenticated');
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
    { id: "projects" as Tab, label: "Projects", icon: FolderKanban },
    { id: "messages" as Tab, label: "Messages", icon: MessageSquare },
    { id: "profile" as Tab, label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-surface-border transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-surface-border">
          <a href="/" className="font-mono text-lg font-semibold text-primary">{"<HR />"}</a>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-background/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <main className="flex-1 min-h-screen">
        <header className="border-b border-surface-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-muted-foreground">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
          </div>
          <span className="text-xs text-muted-foreground font-mono">rahmanhafizur31928@gmail.com</span>
        </header>

        <div className="p-6">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "profile" && <ProfileTab />}
        </div>
      </main>
    </div>
  );
};

// --- Overview Tab ---
const OverviewTab = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [p, c, m] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        // Skip certificates for now since table doesn't exist
        Promise.resolve({ count: 0 }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        projects: p.count ?? 0,
        messages: m.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {[
        { label: "Projects", value: stats.projects, icon: FolderKanban },
        { label: "Messages", value: stats.messages, icon: MessageSquare },
      ].map(({ label, value, icon: Icon }) => (
        <div key={label} className="glass rounded-lg p-6">
          <Icon size={20} className="text-primary mb-3" />
          <p className="text-3xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
};

// --- Projects Tab ---
const ProjectsTab = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", project_link: "", github_link: "", website_link: "", thumbnail_url: "", technologies: "" });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("display_order");
    setProjects(data ?? []);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use thumbnail_url from form if provided, otherwise try file upload
    let thumbnail_url = form.thumbnail_url || null;

    if (thumbnailFile && !thumbnail_url) {
      try {
        // Create a unique filename
        const fileExt = thumbnailFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `project-thumbnails/${fileName}`;
        
        // Upload the file to Supabase storage
        const { error: uploadError, data } = await supabase.storage
          .from('project-images')
          .upload(filePath, thumbnailFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          
          // If bucket doesn't exist, show helpful message
          if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
            toast.error("Storage bucket not found. Please provide an image URL instead, or contact admin to set up storage.");
          } else {
            toast.error(`Upload failed: ${uploadError.message}`);
          }
          return;
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(filePath);
        
        thumbnail_url = publicUrl;
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error('Upload error:', error);
        toast.error("Image upload failed. Please provide an image URL instead.");
        return;
      }
    }

    const payload = {
      title: form.title,
      description: form.description,
      project_link: form.project_link || null,
      github_link: form.github_link || null,
      website_link: form.website_link || null,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      ...(thumbnail_url && { thumbnail_url }),
    };

    if (editId) {
      await supabase.from("projects").update(payload).eq("id", editId);
      toast.success("Project updated");
    } else {
      await supabase.from("projects").insert(payload);
      toast.success("Project added");
    }

    setForm({ title: "", description: "", project_link: "", github_link: "", website_link: "", thumbnail_url: "", technologies: "" });
    setThumbnailFile(null);
    setShowForm(false);
    setEditId(null);
    fetchProjects();
  };

  const handleEdit = (p: any) => {
    setForm({
      title: p.title,
      description: p.description,
      project_link: p.project_link ?? "",
      github_link: p.github_link ?? "",
      website_link: p.website_link ?? "",
      thumbnail_url: p.thumbnail_url ?? "",
      technologies: p.technologies.join(", "),
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    toast.success("Project deleted");
    fetchProjects();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold">Manage Projects</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: "", description: "", project_link: "", github_link: "", website_link: "", thumbnail_url: "", technologies: "" }); }} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all">
          <Plus size={14} /> Add Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass rounded-lg p-6 mb-6 space-y-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project Title" required className="w-full glass rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" required rows={3} className="w-full glass rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={form.project_link} onChange={(e) => setForm({ ...form, project_link: e.target.value })} placeholder="Live Link (optional)" className="glass rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
            <input value={form.github_link} onChange={(e) => setForm({ ...form, github_link: e.target.value })} placeholder="GitHub Link (optional)" className="glass rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <input value={form.website_link} onChange={(e) => setForm({ ...form, website_link: e.target.value })} placeholder="Website Link (optional)" className="w-full glass rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
          <input value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} placeholder="Thumbnail Image URL (optional)" className="w-full glass rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
          <div className="text-xs text-muted-foreground">
            <p>💡 Either provide an image URL above OR upload a file below</p>
          </div>
          <input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="Technologies (comma-separated)" required className="w-full glass rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Or Upload Image File</label>
            <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] ?? null)} className="text-sm text-muted-foreground" />
            {thumbnailFile && (
              <div className="mt-2 text-xs text-muted-foreground">
                Selected: {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all">
              {editId ? "Update" : "Create"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="glass px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="glass rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {p.thumbnail_url && <img src={p.thumbnail_url} alt="" className="w-12 h-12 rounded object-cover" />}
              <div>
                <h3 className="font-medium text-sm">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.technologies.join(", ")}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Edit size={14} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No projects yet. Add your first project!</p>}
      </div>
    </div>
  );
};

// --- Messages Tab ---
const MessagesTab = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    toast.success("Message deleted");
    fetchMessages();
  };

  return (
    <div>
      <h2 className="font-semibold mb-6">Contact Messages</h2>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="glass rounded-lg p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-sm">{m.sender_name}</h3>
                <p className="text-xs text-muted-foreground font-mono">{m.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground font-mono">
                  {new Date(m.created_at).toLocaleDateString()}
                </span>
                <button onClick={() => handleDelete(m.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No messages yet.</p>}
      </div>
    </div>
  );
};

// --- Profile Tab ---
const ProfileTab = () => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleUpload = async (file: File, bucket: string, label: string) => {
    const ext = file.name.split(".").pop();
    const path = `${label}.${ext}`;
    
    // Delete existing
    await supabase.storage.from(bucket).remove([path]);
    
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) {
      toast.error(`Failed to upload ${label}`);
    } else {
      toast.success(`${label} uploaded successfully`);
    }
  };

  return (
    <div className="max-w-lg space-y-8">
      <div className="glass rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Upload size={16} className="text-primary" /> Profile Picture
        </h3>
        <input type="file" accept="image/*" onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)} className="text-sm text-muted-foreground mb-3" />
        {profileFile && (
          <button onClick={() => handleUpload(profileFile, "profile", "avatar")} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all">
            Upload Photo
          </button>
        )}
      </div>

      <div className="glass rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Upload size={16} className="text-primary" /> Resume (PDF)
        </h3>
        <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} className="text-sm text-muted-foreground mb-3" />
        {resumeFile && (
          <button onClick={() => handleUpload(resumeFile, "profile", "resume")} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all">
            Upload Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
