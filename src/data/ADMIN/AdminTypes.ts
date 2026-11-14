export type ProviderApplicant = {
  id: string;
  name: string | null;
  email: string | null;
  profileImage: string | null;
};

export type ProviderApplication = {
  id: string;
  userId: string;
  businessName: string;
  serviceArea: string;
  selfie: string | null;
  CNICNumber: string | null;
  CNICNAME: string | null;
  CNICFrontSide: string | null;
  CNICBackSide: string | null;
  applicationStatus: string;
  createdAt: string;
  updatedAt: string;
  owner: string | null;
  users: ProviderApplicant | null;
};
