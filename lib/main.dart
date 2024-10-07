import 'package:flutter/material.dart';
import 'package:fastlocation/src/shared/storage/hive_config.dart';
import 'package:fastlocation/src/routes/app_routes.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await HiveConfig.iniciar();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fast Location',
      routes: AppRoutes.routes,
      initialRoute: AppRoutes.initial, // Garantir que 'initial' está definido
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
    );
  }
}
