import { z } from 'zod'

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  budget:  z.string().min(1, 'Please select a budget range'),
  message: z.string().min(20, 'Please describe your project (min 20 characters)'),
})

export const testimonialSchema = z.object({
  author_name:  z.string().min(2, 'Name must be at least 2 characters'),
  project_name: z.string().min(2, 'Project name required'),
  review_text:  z.string().min(30, 'Review must be at least 30 characters'),
  rating:       z.number().min(1).max(5),
})

export const loginSchema = z.object({
  email:    z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
})

export const projectSchema = z.object({
  title:       z.string().min(2, 'Title required'),
  category:    z.string().min(2, 'Category required'),
  description: z.string().min(20, 'Description required'),
  tech_stack:  z.string().min(1, 'Add at least one technology'),
  live_url:    z.string().url().optional().or(z.literal('')),
  github_url:  z.string().url().optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
})
