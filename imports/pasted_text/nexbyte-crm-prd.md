Product Requirements Document (PRD)
NexByte CRM Landing Page
1. Product Overview

Product Name: NexByte CRM
Product Type: SaaS Landing Page + Subscription Gateway

Purpose

The NexByte CRM landing page introduces the CRM platform and acts as the subscription entry point for users. Visitors can view product information, choose a subscription plan, select their CRM type, sign up, and then be redirected to the main CRM web application.

CRM Web Application Login

https://ren-urot.github.io/Webapp/login

2. Goals
Business Goals

Convert website visitors into subscribers

Present CRM solutions tailored to different industries

Direct users to the main CRM web application

User Goals

Users should be able to:

Understand NexByte CRM features

Choose a subscription plan

Select the CRM type for their business

Create an account

Access the CRM web application

3. System Scope
Landing Page Responsibilities

The landing page will:

Display CRM product information

Showcase industry CRM solutions

Display pricing plans

Allow users to select a subscription plan

Collect signup details

Allow CRM type selection

Redirect users to the CRM login page

Web App Responsibilities

The main CRM web application will handle:

User authentication

CRM dashboard

Customer management

Sales tracking

Analytics and reporting

Data storage

The landing page does not manage CRM data or dashboard functionality.

4. User Flow

Visitor lands on website
↓
Reads product information
↓
Views pricing plans
↓
Clicks Choose Plan
↓
Signup Page
↓
Select CRM Type
↓
Create Account
↓
Redirect to CRM Web App Login
↓
https://ren-urot.github.io/Webapp/login

5. Landing Page Sections
5.1 Hero Section

Headline

Next Generation CRM Software Solutions

Call To Action Buttons

Start Now

View Plans

Purpose: Introduce the CRM platform and encourage users to explore pricing.

5.2 Solutions Section

Title

Tailored Solutions For Your Growth

CRM Industry Types

Finance CRM

Real Estate CRM

Retail CRM

Hospitality CRM

Flower Shop CRM

Each card includes:

Industry icon

Short description

CRM type name

5.3 About Section

Title

Founded by Industry Veterans

Purpose:

Build credibility and trust by highlighting company experience and industry expertise.

Content may include:

Company background

Experience in CRM and SaaS

Mission and vision

5.4 Pricing Section

Title

Simple pricing based on your needs

Pricing Plans

Individual — $20/month
For freelancers or single users.

Team — $50/month
For small teams and businesses.

Enterprise — $85/month
For growing companies and organizations.

Each pricing card includes:

Plan name

Monthly price

Feature list

Choose Plan button

6. Signup Flow

When the user clicks Choose Plan, they are redirected to the Signup Page.

Example route:

/signup

Signup Form Fields

Full Name

Email Address

Phone Number

Company Name

Password

Plan Selection

The plan is pre-selected from the pricing page.

Options:

Individual

Team

Enterprise

CRM Type Selection

User must choose their CRM industry type.

Options:

Finance CRM

Real Estate CRM

Retail CRM

Hospitality CRM

Flower Shop CRM

7. Redirect Logic

After successful signup, users will be redirected to the CRM web application login page.

Redirect URL:

https://ren-urot.github.io/Webapp/login

Optional parameters can be passed:

Example:

https://ren-urot.github.io/Webapp/login?plan=team&crm=retail

This allows the CRM system to detect:

subscription plan

CRM type

8. Technical Stack
Frontend

React

Vite

TailwindCSS

Shadcn UI

Hosting

GitHub Pages

Netlify

Vercel

Main CRM Web App

https://ren-urot.github.io/Webapp

9. Functional Requirements
Landing Page

The website must include:

Navigation menu

Hero section

CRM solutions section

About section

Pricing section

Footer

Signup System

The system must support:

Plan selection

CRM type selection

User data capture

Redirect to CRM web application

10. Non-Functional Requirements
Performance

Page load time under 2 seconds

Optimized images and assets

Responsiveness

Must work on:

Mobile

Tablet

Desktop

Security

HTTPS enabled

Input validation for forms

11. Success Metrics

Key performance indicators:

Landing page conversion rate

Signup rate

Subscription plan selection distribution

Traffic redirected to CRM login page

12. Future Enhancements

Potential upgrades for later versions:

Stripe payment integration

CRM product demo preview

AI chatbot for onboarding

Industry-specific CRM templates

Free trial option