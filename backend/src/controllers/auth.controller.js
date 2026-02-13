import { asyncHandler } from "../utils/asyncHandler.js"; // Import the asyncHandler function from the asyncHandler.js file
import { ApiError } from "../utils/ApiError.js"; // Import the ApiError class from the ApiError.js file
import { ApiResponse } from "../utils/ApiResponse.js"; // Import the ApiResponse class from the ApiResponse.js file
import { User } from "../models/auth.model.js"; // Import the User model from the user.model.js file
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library to handle JWT tokens
import bcrypt from "bcrypt"; // import bcrypt for password hashing

const options = {
  // Set the options for the cookies
  httpOnly: true, // The cookie is only accessible by the server
  secure: true, // The cookie is only sent over HTTPS
}; // The options object for the cookies

// Function to generate access and refresh tokens for the user
// The generateAccessAndRefreshToken function generates access and refresh tokens for the user
const generateAccessAndRefreshToken = async (userID) => {
  // The function takes the user id as an argument
  try {
    // Find the user by id and generate the access and refresh tokens
    const user = await User.findById(userID); // Find the user by id
    const accessToken = user.generateAccessToken(); // Generate the access token
    const refreshToken = user.generateRefreshToken(); // Generate the refresh token

    user.refreshToken = refreshToken; // Set the refresh token in the user object
    // console.log('Access token : ' + accessToken);
    // console.log('Refresh token : ' + refreshToken);

    await user.save({ validateBeforeSave: false }); // Save the user object with the refresh token

    return { accessToken, refreshToken }; // Return the access and refresh tokens
  } catch (error) {
    // If an error occurs, throw an error with the status code and message
    throw new ApiError(
      500,
      "something went wrong, while generating access and refresh token",
    );
  }
};

const createAdminUser = asyncHandler(async (req, res) => {
    console.log("Creating admin user...");  

  try {
    await User.create({
      email: "devpratham24@gmail.com",
      password: "Pratham@Rathod.26",
    });
    return res
      .status(201)
      .json(new ApiResponse(201, {}, "Admin user created successfully"));
  } catch (error) {
    throw new ApiError(500, "something went wrong while creating admin user");
  }
});

// Controller function to log in a user in the application
const loginUser = asyncHandler(async (req, res) => {
  // req body -> DataTransfer
  // username or email
  // find the user
  // password check
  // access token and refresh token
  // send cookies and res

  // collect username, email, and password from the request body
  const { email, password } = req.body;

  // validate not null username or email
  console.log('email: ' + email);
  // console.log('UserName: ' + username);
  console.log('Password: ' + password);

  // if username or email is not provided, throw an error
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  // find user by username or email from the database
  const user = await User.findOne({
    email,
  });

  // if user not found, throw an error
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // check if the password is correct
  // compare the password with the hashed password in the database
  const isPasswordValid = await user.isPasswordCorrect(password);

  // if the password is not valid, throw an error
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  // generate access and refresh tokens for the user
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  // find the logged in user and exclude the password and refresh token
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  // send the access token and refresh token as cookies in the response
  // send the logged in user in the
  return res
    .status(200) // Set the status code to 200
    .cookie("accessToken", accessToken, options) // Set the access token as a cookie in the response
    .cookie("refreshToken", refreshToken, options) // Set the refresh token as a cookie in the response
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ), // Send the success response with the logged in user and tokens
    ); // Return the response
});

// Controller function to log out a user from the application
const logOutUser = asyncHandler(async (req, res) => {
  // remove the refresh token from the user
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }, // next response will come in updated
  );

  // clear the access token and refresh token cookies
  return res
    .status(200) // Set the status code to 200
    .clearCookie("accessToken", options) // Clear the access token cookie
    .clearCookie("refreshToken", options) // Clear the refresh token cookie
    .json(new ApiResponse(200, {}, "User logged out successfully")); // Send the success response with an empty object
});

// Controller function to refresh the access token for the user
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken; // Get the refresh token from the cookies or request body

  // if refresh token is not provided, throw an error
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  // verify the refresh token and get the user
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    ); // Verify the refresh token using the secret key

    const user = await User.findById(decodedToken?._id); // Find the user by id from the decoded token

    // if user is not found, throw an error
    if (!user) {
      throw new ApiError(401, "Invalid RefreshToken");
    }

    // if the incoming refresh token is not equal to the user's refresh token, throw an error
    if (incomingRefreshToken !== user?.refreshAccessToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    // generate a new access token and refresh token for the user
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    // send the new access token and refresh token as cookies in the response
    return res
      .status(200) // Set the status code to 200
      .cookie("accessToken", accessToken, options) // Set the access token as a cookie in the response
      .cookie("refreshToken", newRefreshToken, options) // Set the refresh token as a cookie in the response
      .json(
        new ApiResponse(
          200,
          {
            user,
            accessToken,
            newRefreshToken,
          },
          "User refreshed access token successfully",
        ), // Send the success response with the user, access token, and refresh token
      );
  } catch (error) {
    // If an error occurs, throw an error with the status code and message
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export {  loginUser, logOutUser, refreshAccessToken, createAdminUser }; // Export the controller functions for the user
