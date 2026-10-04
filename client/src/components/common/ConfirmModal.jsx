import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Centered confirm modal with viewport backdrop.
 * Escape and backdrop click close when onCancel is provided.
 */
function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmClassName = "bg-orange-500 hover:bg-orange-600",
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape" && !loading) {
        onCancel?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          if (!loading) onCancel?.();
        }}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3
            id="confirm-modal-title"
            className="text-xl font-bold text-gray-800"
          >
            {title}
          </h3>

          <button
            type="button"
            onClick={() => {
              if (!loading) onCancel?.();
            }}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`px-5 py-3 rounded-xl text-white font-medium transition disabled:opacity-50 ${confirmClassName}`}
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
