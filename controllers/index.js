import {
  register,
  login,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  activateUser,
} from './user';
import { getAllBookingAsAdmin } from './booking';
import {
  createApartment,
  getAllApartments,
  updateApartment,
  getOneApartment,
} from './apartment';
import {
  createFavourite,
  deleteFavourite,
  getAllFavourites,
} from './favourite';
import { createRating, getAllRating } from './rating';

export {
  register,
  login,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  activateUser,
  createApartment,
  getAllApartments,
  updateApartment,
  getAllBookingAsAdmin,
  getOneApartment,
  createRating,
  getAllRating,
  createFavourite,
  deleteFavourite,
  getAllFavourites,
};
