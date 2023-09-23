import { useDispatch, useSelector } from "react-redux";
import { store } from "./store"; // Assuming store is exported from your store file

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
