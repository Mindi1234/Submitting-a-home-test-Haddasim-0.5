package org.example;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MergeAll {

    public static Map<LocalDate, Map<Integer, Double>> mergeAvgAllFiles(List<String> fileNames) throws IOException {
        Map<LocalDate, Map<Integer, Double>> globalAvg = new HashMap<>();
        for (String file : fileNames) {
            Map<LocalDate, Map<Integer, Double>> hourlyAverages = Tests.avgEachHour(file);
            for (Map.Entry<LocalDate, Map<Integer, Double>> dateEntry : hourlyAverages.entrySet()) {
                LocalDate date = dateEntry.getKey();
                Map<Integer, Double> hourData = dateEntry.getValue();
                globalAvg.computeIfAbsent(date, k -> new HashMap<>());
                for (Map.Entry<Integer, Double> hourEntry : hourData.entrySet()) {
                    int hour = hourEntry.getKey();
                    double avg = hourEntry.getValue();
                    globalAvg.get(date).put(hour, avg);
                }
            }
        }

        return globalAvg;
    }
}
