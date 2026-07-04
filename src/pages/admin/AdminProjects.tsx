import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2, FolderGit2, Link as LinkIcon, Image as ImageIcon, Type, Code, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProjects = () => {
  const { data, updateData } = usePortfolio();
  const [items, setItems] = useState(data.projects);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateData({ ...data, projects: items });
    setSaveMessage('Projects saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleMultiChange = (index: number, updates: Record<string, any>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
  };

  const handleChange = (index: number, key: string, value: any) => {
    handleMultiChange(index, { [key]: value });
  };

  const handleTechChange = (index: number, techString: string) => {
    const techs = techString.split(',').map(t => t.trim());
    handleChange(index, 'technologies', techs);
  };

  const handleAdd = () => {
    setItems([{ title: 'New Project', description: '', image: '', imageName: '', technologies: ['React'], github: '#' }, ...items] as any);
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 mt-1">Manage the projects featured in your portfolio</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all active:scale-95">
            <Plus size={18} /> Add Project
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accentHover hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 active:scale-95">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <AnimatePresence>
        {saveMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 shadow-sm"
          >
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="font-medium">{saveMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-8">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              key={index} // Ideally use a unique ID, but index is fine for now
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="bg-slate-50/80 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shadow-inner">
                     <FolderGit2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Project {index + 1}</h3>
                    <p className="text-xs text-slate-500">{item.title || 'Untitled Project'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(index)} 
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                  title="Delete Project"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Details */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Project Title</label>
                    <div className="relative">
                      <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={item.title} 
                        onChange={(e) => handleChange(index, 'title', e.target.value)} 
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" 
                        placeholder="e.g. Smart Study Planner"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">GitHub / Live URL</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="url" 
                        value={item.github} 
                        onChange={(e) => handleChange(index, 'github', e.target.value)} 
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" 
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Technologies</label>
                    <div className="relative">
                      <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={item.technologies.join(', ')} 
                        onChange={(e) => handleTechChange(index, e.target.value)} 
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" 
                        placeholder="React, TypeScript, Tailwind"
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 pl-1">Separate technologies with commas</p>
                  </div>
                </div>

                {/* Right Column - Media & Description */}
                <div className="space-y-6 flex flex-col">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">Project Banner / Image</label>
                    <div className="flex items-center gap-4">
                      {/* Image Preview Thumbnail */}
                      <div className="w-20 h-20 shrink-0 rounded-xl border-2 border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center relative group">
                        {item.image ? (
                          <>
                            <img src={item.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            <button 
                              onClick={() => handleMultiChange(index, { image: '', imageName: '' })}
                              className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove image"
                            >
                              <Trash2 size={20} />
                            </button>
                          </>
                        ) : (
                          <ImageIcon size={24} className="text-slate-300" />
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-3">
                          <div className="relative">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // Max size check to prevent huge base64 strings
                                  if (file.size > 2 * 1024 * 1024) {
                                     alert("Image is too large! Please keep it under 2MB.");
                                     return;
                                  }
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    handleMultiChange(index, { 
                                      image: reader.result as string, 
                                      imageName: file.name 
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                              id={`project-image-upload-${index}`}
                            />
                            <label htmlFor={`project-image-upload-${index}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:border-accent hover:text-accent transition-all cursor-pointer shadow-sm">
                              <Upload size={16} /> Upload Image
                            </label>
                          </div>
                        </div>
                        {!(item as any).imageName && (
                          <div className="text-xs font-medium text-slate-500">
                            Or enter an external URL below:
                          </div>
                        )}
                        {!(item as any).imageName ? (
                          <div className="relative">
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                              type="url" 
                              value={item.image} 
                              onChange={(e) => handleChange(index, 'image', e.target.value)} 
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-accent transition-all" 
                              placeholder="Or paste image URL (https://...)"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 truncate max-w-[200px]" title={(item as any).imageName}>
                              {(item as any).imageName}
                            </span>
                            <button 
                              onClick={() => handleMultiChange(index, { image: '', imageName: '' })}
                              className="text-xs text-red-500 hover:text-red-600 hover:underline font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 flex-1 flex flex-col">
                    <label className="block text-sm font-semibold text-slate-700">Project Description</label>
                    <textarea 
                      value={item.description} 
                      onChange={(e) => handleChange(index, 'description', e.target.value)} 
                      className="w-full flex-1 min-h-[120px] bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all resize-none leading-relaxed" 
                      placeholder="Describe what the project does, the problems it solves, and your role..."
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed"
           >
              <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <FolderGit2 size={40} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No projects yet</h3>
              <p className="text-slate-500 mt-1 mb-6">Start building your portfolio by adding your first project.</p>
              <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-md">
                <Plus size={18} /> Add Your First Project
              </button>
           </motion.div>
        )}
      </div>
    </motion.div>
  );
};
export default AdminProjects;