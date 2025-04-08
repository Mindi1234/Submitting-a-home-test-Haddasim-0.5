package org.example;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Tests {

    public static boolean duplicates(String fileName) throws IOException {
        List<String> dateTime = new ArrayList<>();
        File file = new File(fileName);
        BufferedReader br = new BufferedReader(new FileReader(file));
        String line;
        while ((line = br.readLine()) != null) {
            String[] column = line.split("\\s+");
            System.out.println(column[0]);
            if (dateTime.contains(column[0])) {
                return true;
            }
            dateTime.add(column[0]);
        }
        return false;
    }



    public static boolean isNumber(String str) {
        try {
            double d =Double.parseDouble(str);
            return !Double.isNaN(d);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static boolean notNumber(String fileName) throws IOException {
        File file = new File(fileName);
        BufferedReader br = new BufferedReader(new FileReader(file));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
            if(line.contains("timestamp,value")){
                continue;
            }
            String[] columnB = line.split(",");
            System.out.println(columnB[1]);
            if(!isNumber(columnB[1])){
                return true;
            }
        }
        return false;
    }

    public static Map<LocalDate, Map<Integer, Double>> avgEachHour(String fileName) throws IOException {
        Map<LocalDate, Map<Integer, List<Double>>> hashMap = new HashMap<>();
        DateTimeFormatter form = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

        String fileNameOnly = new File(fileName).getName();
        String[] splits = fileNameOnly.split("_");
        if (splits.length > 2){
            String dateFromFileName = splits[2].replace(".csv", "").replace(".cvs", "");;
            LocalDate defaultDate = LocalDate.parse(dateFromFileName);

            System.out.println("Opening file: " + fileName);
            if (Files.exists(Paths.get(fileName))){
                File file = new File(fileName);
                BufferedReader br = new BufferedReader(new FileReader(file));
                String line;
                while ((line = br.readLine()) != null) {
                    if(line.toLowerCase().contains("time") && line.toLowerCase().contains("value")){
                        continue;
                    }
                    System.out.println(line);
                    String[] parts = line.split(",");
                    LocalDateTime dateTime;
                    System.out.println(parts[0]);
                    if (parts[0].contains("/")) {
                        dateTime = LocalDateTime.parse(parts[0], form);
                    } else {
                        double hourDouble = Double.parseDouble(parts[0]);
                        int hour = (int) hourDouble;
                        int minutes = (int) Math.round((hourDouble - hour) * 60);
                        LocalTime time = LocalTime.of(hour, minutes);
                        dateTime = LocalDateTime.of(defaultDate, time);
                    }
                    //System.out.println(dateTime);
                    if (parts.length > 1) {
                        if(isNumber(parts[1]) && !parts[1].equals("NaN")){
                            double value = Double.parseDouble(parts[1]);
                            //System.out.println(value);
                            LocalDate date = dateTime.toLocalDate();
                            //System.out.println(date);
                            int hour = dateTime.getHour();
                            //System.out.println(hour);
                            hashMap.computeIfAbsent(date, k -> new HashMap<>());
                            hashMap.get(date).computeIfAbsent(hour, k -> new ArrayList<>());
                            hashMap.get(date).get(hour).add(value);
                        }
                    }
                }
            }
        }
        Map<LocalDate, Map<Integer, Double>> averages = new HashMap<>();
        for (LocalDate date2 : hashMap.keySet()) {
            averages.put(date2, new HashMap<>());
            for (int h: hashMap.get(date2).keySet()) {
                List<Double> values = hashMap.get(date2).get(h);
                double average = 0;
                if (values.isEmpty()) {
                    continue;
                }
                for(Double d: values){
                    average += d;
                }
                average /= values.size();
                averages.get(date2).put(h, average);
            }
        }
        return averages;

    }


}

