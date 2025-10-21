"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export async function sendContactEmail(formData: ContactFormValues): Promise<{ success: boolean, error?: string }> {
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  const { name, email, message } = validatedFields.data;

  try {
    // Log the contact form submission (in a real app, you'd save to database or send email)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: 'Failed to send message. Please try again later.' };
  }
}
