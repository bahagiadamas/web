export default function Modal({ className, children }) {
  return (
    <div className={className} id="modal">
      {children}
    </div>
  );
}
