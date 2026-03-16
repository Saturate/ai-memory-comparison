"use client";

import { createContext, useContext } from "react";

const ColorContext = createContext(true);

export const ColorProvider = ColorContext.Provider;
export const useColors = () => useContext(ColorContext);
