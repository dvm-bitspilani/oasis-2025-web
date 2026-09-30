import {archiveEvents} from "../../../../utils/archive";
export const useFetchEvents = (category:string) => archiveEvents.filter(event=>event.category===category.toLowerCase());
