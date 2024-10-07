import 'package:hive_flutter/hive_flutter.dart';

class HiveConfig {
  static Future<void> init() async {
    await Hive.initFlutter();
    await _openBoxes();
  }

  static Future<void> _openBoxes() async {
    if (!Hive.isBoxOpen('enderecos')) {
      await Hive.openBox<String>('enderecos');
    }
  }

  static Future<void> iniciar() async {
    await init();
  }
}
