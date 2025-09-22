import React, { useState, useRef, useEffect } from 'react';

declare const feather: any;

interface FileUploadInputProps {
  onFileChange: (file: File | null) => void;
  label: string;
  id: string;
  previewShape?: 'circle' | 'square';
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ onFileChange, label, id, previewShape = 'square' }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    feather.replace();
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsActive(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileChange(null);
    setIsActive(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="md:col-span-2">
      <label className="block text-gray-700 mb-2">{label}</label>
      <div
        className={`file-upload rounded-lg p-6 text-center cursor-pointer ${isActive ? 'active' : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        <i data-feather="upload" className="mx-auto text-gray-400 mb-2"></i>
        <p className="text-gray-500">Click to upload {label.toLowerCase()}</p>
        <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 2MB</p>
        <input type="file" ref={inputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      </div>
      {preview && (
        <div className="preview mt-4">
          <img 
            src={preview} 
            alt="Preview" 
            className={`h-20 ${previewShape === 'circle' ? 'rounded-full w-20 object-cover' : 'rounded'}`} 
          />
          <button type="button" onClick={handleRemove} className="text-red-500 text-sm mt-2 flex items-center">
            <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
