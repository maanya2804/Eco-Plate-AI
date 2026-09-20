/**
 * Consistent page-level header used across all inner pages.
 */
export default function PageHeader({ icon, title, subtitle, children }) {
  return (
    <div className="bg-gradient-to-br from-eco-700 to-eco-600 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {icon && (
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-eco-100 text-lg max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  )
}
