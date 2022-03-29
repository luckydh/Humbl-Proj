import { Countries } from "../../../utils/Countries";

export interface OnboardingFlowFormsProps {
  onNextStep: (formData: Record<string, any>) => void;
  selectedCountry: Countries;
  formState?: Record<string, any>;
  onFormChanged?: (newFormData: Record<string, any>) => void;
}
