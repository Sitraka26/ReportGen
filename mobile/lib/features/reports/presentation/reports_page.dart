import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:report_gem/core/theme/app_theme.dart';

class ReportsPage extends StatelessWidget {
  const ReportsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'ReportGem',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: AppTheme.primary,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.dashboard_outlined),
            onPressed: () => context.go('/dashboard'),
          ),
        ],
      ),
      body: const Center(
        child: Text('Liste des rapports'),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: AppTheme.primary,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text(
          'Nouveau rapport',
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}