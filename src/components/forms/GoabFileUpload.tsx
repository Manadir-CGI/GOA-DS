import React, { useState, useRef } from "react";

export interface GoabUploadedFile {
  name: string;
  /** Size in bytes (shown as KB/MB once uploaded). */
  size?: number;
  /** 0–100. While < 100 a progress bar replaces the size. */
  progress?: number;
  /** The underlying File object, when chosen from disk. */
  file?: File;
}

/**
 * Government of Alberta file upload — a drag-and-drop dropzone (default) or a
 * button trigger, with a list of selected files showing size, optional upload
 * progress and a remove control.
 */
export interface GoabFileUploadProps {
  /** Dropzone with drag-and-drop, or a single button row. */
  variant?: "dragdrop" | "button";
  /** Accepted file types, e.g. ".pdf,.jpg" or "image/*". */
  accept?: string;
  /** Allow selecting more than one file. Default true. */
  multiple?: boolean;
  /** Max file size in bytes (for your validation / help copy). */
  maxFileSize?: number;
  /** Secondary line, e.g. "PDF or JPG, up to 10 MB". */
  helpText?: string;
  /** Controlled list of files. */
  files?: GoabUploadedFile[];
  /** Initial files — uncontrolled. */
  defaultFiles?: GoabUploadedFile[];
  onChange?: (files: GoabUploadedFile[]) => void;
  /** Margin (spacing token: none, 3xs…4xl) on top / right / bottom / left. */
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
}

/**
 * Government of Alberta — File upload (goa-file-upload).
 * Drag-and-drop dropzone (default) or a button trigger, followed by a list
 * of selected files with size, an optional progress bar and a remove control.
 */

const CSS = `
.goab-fileupload { font-family: var(--goa-font-family-sans); width: 100%; }
.goab-fileupload__zone {
  display: flex; flex-direction: column; align-items: center; gap: var(--goa-space-xs);
  text-align: center;
  padding: var(--goa-file-upload-padding);
  background: var(--goa-file-upload-color-bg);
  border: var(--goa-file-upload-border);
  border-radius: var(--goa-file-upload-border-radius);
  cursor: pointer; transition: background .12s ease, border-color .12s ease;
}
.goab-fileupload__zone:hover { background: var(--goa-file-upload-color-bg-hover); border: var(--goa-file-upload-border-hover); }
.goab-fileupload__zone:focus-visible { outline: none; box-shadow: var(--goa-file-upload-border-focus); }
.goab-fileupload__zone--drag { background: var(--goa-file-upload-color-bg-drag); border: var(--goa-file-upload-border-drag); }
.goab-fileupload__zone ion-icon { font-size: var(--goa-icon-size-xl); color: var(--goa-color-interactive-default); }
.goab-fileupload__instr { font: var(--goa-file-upload-instruction-text); color: var(--goa-color-text-default); }
.goab-fileupload__link { color: var(--goa-file-upload-instruction-color); text-decoration: underline; }
.goab-fileupload__help { font: var(--goa-file-upload-help-text); color: var(--goa-file-upload-help-text-color); }
.goab-fileupload__list { list-style: none; margin: var(--goa-space-m) 0 0; padding: 0; display: flex; flex-direction: column; gap: var(--goa-space-xs); }
.goab-fileupload__item {
  display: flex; align-items: center; gap: var(--goa-space-s);
  padding: var(--goa-space-xs) var(--goa-space-s);
  border: var(--goa-border-width-2xs) solid var(--goa-color-greyscale-200);
  border-radius: var(--goa-border-radius-m);
  background: var(--goa-color-greyscale-white);
}
.goab-fileupload__item > ion-icon { font-size: var(--goa-icon-size-l); color: var(--goa-color-greyscale-600); flex: 0 0 auto; }
.goab-fileupload__meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: var(--goa-space-3xs); }
.goab-fileupload__name { font: var(--goa-typography-body-s); color: var(--goa-color-text-default); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.goab-fileupload__size { font: var(--goa-typography-body-xs); color: var(--goa-color-text-secondary); font-family: var(--goa-font-family-mono); }
.goab-fileupload__track { height: var(--goa-space-2xs); border-radius: var(--goa-border-radius-m); background: var(--goa-color-greyscale-200); overflow: hidden; margin-top: 2px; }
.goab-fileupload__bar { height: 100%; background: var(--goa-color-interactive-default); border-radius: inherit; transition: width .2s ease; }
.goab-fileupload__remove {
  flex: 0 0 auto; background: none; border: none; cursor: pointer; padding: 4px;
  border-radius: var(--goa-border-radius-m); color: var(--goa-color-greyscale-600); display: inline-flex; line-height: 0;
}
.goab-fileupload__remove:hover { background: var(--goa-color-greyscale-100); color: var(--goa-color-interactive-error); }
.goab-fileupload__remove ion-icon { font-size: var(--goa-icon-size-m); }
`;

let injected = false;
function useStyles() {
  if (typeof document === "undefined" || injected) return;
  injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-goab", "fileupload");
  el.textContent = CSS;
  document.head.appendChild(el);
}

function fmtSize(bytes?: number | null) {
  if (bytes == null) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

const space = (v?: string | null) =>
  v == null ? undefined : v === "none" ? "0" : `var(--goa-space-${v})`;

export function GoabFileUpload({
  variant = "dragdrop",
  accept,
  multiple = true,
  maxFileSize,
  helpText,
  files: controlled,
  defaultFiles = [],
  onChange,
  mt,
  mr,
  mb,
  ml,
  testId,
}: GoabFileUploadProps) {
  useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = useState(defaultFiles);
  const list = isControlled ? (controlled as GoabUploadedFile[]) : internal;
  const [drag, setDrag] = useState(false);

  function commit(next: GoabUploadedFile[]) {
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  }
  function add(fileList: FileList) {
    const incoming = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      progress: undefined,
      file: f,
    }));
    commit(multiple ? [...list, ...incoming] : incoming.slice(0, 1));
  }
  function remove(i: number) {
    commit(list.filter((_, idx) => idx !== i));
  }

  const rootStyle: React.CSSProperties = {};
  if (mt != null) rootStyle.marginTop = space(mt);
  if (mr != null) rootStyle.marginRight = space(mr);
  if (mb != null) rootStyle.marginBottom = space(mb);
  if (ml != null) rootStyle.marginLeft = space(ml);

  return (
    <div
      className="goab-fileupload"
      style={Object.keys(rootStyle).length ? rootStyle : undefined}
      data-testid={testId}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files.length) add(e.target.files);
          e.target.value = "";
        }}
      />
      {variant === "button" ? (
        <div
          className="goab-fileupload__zone"
          style={{
            flexDirection: "row",
            padding: "var(--goa-space-m) var(--goa-space-l)",
            justifyContent: "flex-start",
            gap: "var(--goa-space-m)",
          }}
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current && inputRef.current.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current && inputRef.current.click();
            }
          }}
        >
          <ion-icon
            name="cloud-upload-outline"
            style={{ fontSize: "var(--goa-icon-size-l)" }}
          ></ion-icon>
          <span className="goab-fileupload__instr">
            <span className="goab-fileupload__link">Choose a file</span> to upload
          </span>
          {helpText && (
            <span className="goab-fileupload__help" style={{ marginLeft: "auto" }}>
              {helpText}
            </span>
          )}
        </div>
      ) : (
        <div
          className={`goab-fileupload__zone${drag ? " goab-fileupload__zone--drag" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current && inputRef.current.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current && inputRef.current.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length) add(e.dataTransfer.files);
          }}
        >
          <ion-icon name="cloud-upload-outline"></ion-icon>
          <span className="goab-fileupload__instr">
            Drag and drop your file here, or{" "}
            <span className="goab-fileupload__link">choose a file</span>
          </span>
          {helpText && <span className="goab-fileupload__help">{helpText}</span>}
        </div>
      )}

      {list.length > 0 && (
        <ul className="goab-fileupload__list">
          {list.map((f, i) => (
            <li key={i} className="goab-fileupload__item">
              <ion-icon name="document-outline"></ion-icon>
              <span className="goab-fileupload__meta">
                <span className="goab-fileupload__name">{f.name}</span>
                {typeof f.progress === "number" && f.progress < 100 ? (
                  <span className="goab-fileupload__track">
                    <span className="goab-fileupload__bar" style={{ width: f.progress + "%" }} />
                  </span>
                ) : (
                  <span className="goab-fileupload__size">{fmtSize(f.size)}</span>
                )}
              </span>
              <button
                type="button"
                className="goab-fileupload__remove"
                aria-label={`Remove ${f.name}`}
                onClick={() => remove(i)}
              >
                <ion-icon name="close"></ion-icon>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoabFileUpload;
