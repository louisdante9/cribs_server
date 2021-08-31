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
  deleteApartment,
} from './apartment';
import {
  createFavourite,
  deleteFavourite,
  getAllFavourites,
  getAllUserFavourites,
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
  deleteApartment,
  getAllBookingAsAdmin,
  getOneApartment,
  createRating,
  getAllRating,
  createFavourite,
  deleteFavourite,
  getAllFavourites,
  getAllUserFavourites,
};
