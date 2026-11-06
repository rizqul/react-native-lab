export type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export type ContactSection = {
  title: string;
  data: Contact[];
};
