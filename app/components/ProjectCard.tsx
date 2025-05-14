import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  category: string;
}

export default function ProjectCard({ title, description, imageUrl, slug, category }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
    >
      <Link href={`/work/${slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="p-6">
          <span className="mb-2 inline-block text-sm font-medium text-primary">
            {category}
          </span>
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
} 