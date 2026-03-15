export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
}

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  demo,
}: Project) {
  return (
    <div className="p-5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <div className="flex items-center gap-3 flex-shrink-0">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs font-mono text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
