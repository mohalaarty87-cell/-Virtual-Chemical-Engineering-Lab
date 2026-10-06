import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon, FileText, Trash2, Download, Plus, CheckCircle2, ExternalLink } from 'lucide-react';
import { SimulatorItem, SimulatorAttachment } from '../types';
import { sfx } from '../utils/audio';

interface ResourceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulators: SimulatorItem[];
  attachmentsMap: Record<string, SimulatorAttachment[]>;
  onAddAttachment: (simulatorId: string, attachment: SimulatorAttachment) => void;
  onDeleteAttachment: (simulatorId: string, attachmentId: string) => void;
  lang: 'ar' | 'en';
}

export const ResourceManagerModal: React.FC<ResourceManagerModalProps> = ({
  isOpen,
  onClose,
  simulators,
  attachmentsMap,
  onAddAttachment,
  onDeleteAttachment,
  lang,
}) => {
  const [selectedSimId, setSelectedSimId] = useState<string>(simulators[0]?.id || '');
  const [name, setName] = useState('');
  const [type, setType] = useState<'link' | 'file' | 'image' | 'pdf'>('link');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [fileData, setFileData] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    if (!name) setName(file.name);

    if (file.type.includes('image')) setType('image');
    else if (file.type.includes('pdf')) setType('pdf');
    else setType('file');

    const reader = new FileReader();
    reader.onload = () => {
      setFileData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAttachment: SimulatorAttachment = {
      id: `att-${Date.now()}`,
      name: name.trim(),
      type,
      url: type === 'link' ? url.trim() : undefined,
      fileData,
      fileSize: fileSize || undefined,
      notes: notes.trim() || undefined,
      addedAt: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US'),
    };

    onAddAttachment(selectedSimId, newAttachment);
    sfx.playBeep();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);

    // Reset inputs
    setName('');
    setUrl('');
    setNotes('');
    setFileData(undefined);
    setFileName('');
    setFileSize('');
  };

  const selectedSim = simulators.find((s) => s.id === selectedSimId);
  const currentAttachments = attachmentsMap[selectedSimId] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-400" />
              <span>
                {lang === 'ar'
                  ? 'مركز ربط الملفات والمرفقات الإضافية'
                  : 'Resource & Attachment Hub'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ar'
                ? 'اربط أي ملفات أو روابط أو شروحات إضافية بالمحاكي المناسب (ENG ALAA MOHAMMED)'
                : 'Attach external files, links, or documents to any simulator (ENG ALAA MOHAMMED)'}
            </p>
          </div>
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Simulator Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {lang === 'ar' ? 'اختر المحاكي المطلوب لربط الملف:' : 'Select Target Simulator:'}
            </label>
            <select
              value={selectedSimId}
              onChange={(e) => setSelectedSimId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400 text-sm"
            >
              {simulators.map((sim, index) => (
                <option key={sim.id} value={sim.id}>
                  #{index + 1} - {lang === 'ar' ? sim.title_ar : sim.title_en}
                </option>
              ))}
            </select>
          </div>

          {/* Add New Attachment Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/70 space-y-4">
            <div className="font-semibold text-xs text-cyan-300 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة ملف أو رابط جديد' : 'Add New File or Link'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ar' ? 'اسم الملف / العنوان:' : 'Title / Label:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'مثال: تقرير التجارب المعملية' : 'e.g. Lab Experiment Report'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ar' ? 'نوع المرفق:' : 'Type:'}
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['link', 'file', 'image', 'pdf'] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setType(t)}
                      className={`py-1 text-xs font-medium rounded capitalize transition ${
                        type === t
                          ? 'bg-cyan-500 text-black font-bold'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {type === 'link' ? (
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ar' ? 'الرابط الخارجي (URL):' : 'External Link (URL):'}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute top-2.5 end-3" />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  {lang === 'ar' ? 'اختر ملفاً من جهازك:' : 'Select Local File:'}
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                />
                {fileName && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    ✓ {fileName} ({fileSize})
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                {lang === 'ar' ? 'ملاحظات وتفاصيل إضافية:' : 'Notes / Description:'}
              </label>
              <textarea
                rows={2}
                placeholder={lang === 'ar' ? 'اكتب أي ملاحظة أو شرح...' : 'Any additional notes...'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {savedSuccess ? (
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  {lang === 'ar' ? 'تم ربط الملف بنجاح!' : 'Attached successfully!'}
                </span>
              ) : <span></span>}

              <button
                type="submit"
                className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-lg transition shadow-md shadow-cyan-500/20"
              >
                {lang === 'ar' ? 'ربط الملف بالمحاكي' : 'Attach to Simulator'}
              </button>
            </div>
          </form>

          {/* Currently Attached Files List */}
          <div>
            <h3 className="font-semibold text-xs text-slate-300 mb-3 flex items-center justify-between">
              <span>
                {lang === 'ar' ? 'الملفات المربوطة حالياً بهذا المحاكي:' : 'Currently Attached Files:'} (
                {currentAttachments.length})
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                {selectedSim ? (lang === 'ar' ? selectedSim.title_ar : selectedSim.title_en) : ''}
              </span>
            </h3>

            {currentAttachments.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                {lang === 'ar'
                  ? 'لا توجد مرفقات مرتبطة بهذا المحاكي حتى الآن. أضف روابط أو ملفات أعلاه.'
                  : 'No files attached yet to this simulator. Add files or links above.'}
              </div>
            ) : (
              <div className="space-y-2">
                {currentAttachments.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400">
                        {att.type === 'link' ? <LinkIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">{att.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span className="uppercase text-cyan-400 font-mono">{att.type}</span>
                          <span>·</span>
                          <span>{att.addedAt}</span>
                          {att.fileSize && (
                            <>
                              <span>·</span>
                              <span>{att.fileSize}</span>
                            </>
                          )}
                        </div>
                        {att.notes && <p className="text-[11px] text-slate-400 mt-1 italic">{att.notes}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {att.url && (
                        <a
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 transition"
                          title="Open Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {att.fileData && (
                        <a
                          href={att.fileData}
                          download={att.name}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 transition"
                          title="Download File"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          sfx.playClick();
                          onDeleteAttachment(selectedSimId, att.id);
                        }}
                        className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/50 text-rose-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>ENG ALAA MOHAMMED © 2026</span>
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
