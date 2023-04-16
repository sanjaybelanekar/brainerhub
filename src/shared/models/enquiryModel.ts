interface TravelDates {
  from: Date | string;
  to: Date | string;
}

interface Meals {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface Destinations {
  place: string;
}
interface Participants {
  name: string;
  age: number;
}

interface EnquiryModel {
  _id?: String;
  enquiryId?: number;
  contactPersonName?: String;
  contactPersonMobile?: String;
  contactPersonEmail?: String;
  destinations?: Destinations[];
  travelDates?: TravelDates;
  travelDuration?: number;
  participants?: Participants[];
  hotelCategory?: string;
  rooms?: number;
  meals?: Meals;
  anythingElse?: string;
  enquiryStatus?: string;
}
export default EnquiryModel;
