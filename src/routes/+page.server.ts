import type { Actions } from './$types';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        // Process the form data and perform actions
        return { success: true };
      },
} satisfies Actions;