import { model, Schema } from "mongoose";

const studentInfoSchema = new Schema(
  {
    matricula: {
      type: Number,
      required: false
    },
    beca_activa: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password_hash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Estudiante", "Cafeteria", "Administrador"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Activo", "Inactivo"],
      default: "Activo",
    },

    student_info: {
      type: studentInfoSchema,
      required: function () {
        return this.role === "Estudiante";
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("User", userSchema);
