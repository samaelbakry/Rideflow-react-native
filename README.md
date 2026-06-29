# RideFlow 

RideFlow is a React Native mobile application built with Expo that simulates a modern ride-hailing experience. The app allows users to sign in or create an account, choose a pickup and destination, view available vehicle options, track assigned drivers, follow trip progress on a map, review past rides, and manage their profile.

## Overview

The project is structured as an Expo Router application with typed routes, Redux-based state management, Supabase authentication and data storage, and map rendering powered by React Native Maps. It focuses on a smooth mobile-first experience for booking and tracking rides.

## Key Features

- User authentication with login and registration screens
- Protected navigation based on authentication state
- Home screen for pickup and destination search
- Vehicle and driver selection flow
- Route visualization using map polyline data
- Ride lifecycle states such as driver assigned and trip started
- Ride history and activity tracking
- Profile editing with avatar upload support
- Responsive mobile UI built with React Native and Tailwind-style utilities

## Tech Stack

- React Native with Expo
- Expo Router for file-based navigation
- TypeScript
- Redux Toolkit for application state
- React Hook Form and Zod for form handling and validation
- Supabase for authentication, database, and storage
- React Native Maps and map direction services
- Tailwind-style styling via twrnc

## Project Structure

- app/ - application screens and route-based pages
- components/ - reusable UI building blocks and map-related components
- constants/ - shared app constants
- hooks/ - custom hooks
- lib/ - external service initialization
- providers/ - auth and Redux providers
- schemas/ - validation schemas
- services/ - API and backend integration helpers
- store/ - Redux store and slices
- types/ - shared TypeScript interfaces and props

## Notes

This application expects Supabase tables and storage buckets for authentication and ride-related data, including profile, car, driver, and ride records. The app uses the OSRM routing service for map directions and route geometry.

## Development Status

This repository represents a functional mobile app prototype with authentication, map-based ride flow, profile management, and ride history.
