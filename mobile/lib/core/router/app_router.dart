import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:report_gem/features/auth/presentation/login_page.dart';
import 'package:report_gem/features/auth/presentation/register_page.dart';
import 'package:report_gem/features/reports/presentation/reports_page.dart';
import 'package:report_gem/features/dashboard/presentation/dashboard_page.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: '/login',
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterPage(),
      ),
      GoRoute(
        path: '/reports',
        builder: (context, state) => const ReportsPage(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardPage(),
      ),
    ],
  );
}