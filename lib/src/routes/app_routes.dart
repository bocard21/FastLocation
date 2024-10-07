import 'package:flutter/material.dart';
import 'package:fastlocation/src/modules/home/page/home_page.dart';
import 'package:fastlocation/src/modules/history/page/history_page.dart';
import 'package:fastlocation/src/modules/home/controller/cep_controller.dart';

class AppRoutes {
  static const String initial = '/';
  static const String history = '/history';

  static final CepController cepController = CepController();

  static Map<String, WidgetBuilder> get routes {
    return {
      initial: (_) => HomePage(cepController: cepController),
      history: (_) => HistoryPage(),
    };
  }
}
