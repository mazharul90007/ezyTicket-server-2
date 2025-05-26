import { Schema, model } from 'mongoose';
import { TUser, TUserName, UserStaticMethod } from './user.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name cannot be more than 20 characters'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
    default: 'firstName',
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [20, 'Last name cannot be more than 20 characters'],
  },
});

const userSchema = new Schema<TUser, UserStaticMethod>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not not valid email',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active',
    },
    phone: {
      type: Number,
      required: [true, 'Phone number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    role: {
      type: String,
      enum: [
        'user',
        'admin',
        'eventManager',
        'entertainManager',
        'travelManager',
      ],
      required: [true, 'Role is required'],
      default: 'user',
    },
    time: {
      type: String,
      default: new Date().toISOString(),
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual Full Name
userSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//Query Middlwware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
userSchema.statics.isUserExist = async function (email: string) {
  const existingUser = await User.findOne({ email });
  return existingUser;
};

//create a custom instance method
// userSchema.methods.isUserExist = async function (email: string) {
//   const existingUser = await User.findOne({ email });
//   return existingUser;
// };

export const User = model<TUser, UserStaticMethod>('users', userSchema);
