import java.io.*;
import java.util.*;

public class FileErrorManagement {
    private static final int MINI_FILE_SIZE = 10000;

    public static List<String> splitFile(String filename) throws IOException {
        List<String> miniFiles = new ArrayList<>();
        File file = new File(filename);
        BufferedReader br = new BufferedReader(new FileReader(file));
        String line;
        List<String> lines = new ArrayList<>();
        int count = 0;
        while ((line = br.readLine()) != null) {
            lines.add(line);
            if (lines.size() >= MINI_FILE_SIZE) {
                String chunkFile = saveFile(lines, count);
                miniFiles.add(chunkFile);
                count++;
                lines.clear();
            }
        }
        if (!lines.isEmpty()) {
            String chunkFile = saveFile(lines, count);
            miniFiles.add(chunkFile);
        }
        br.close();
        return miniFiles;
    }

    private static String saveFile(List<String> lines, int count) throws IOException {
        String file = "file_number_" + count + ".txt";
        FileWriter writer = new FileWriter(file);
        for (String line : lines) {
            writer.write(line + System.lineSeparator());
        }
        writer.close();
        return file;
    }

    public static Map<String, Integer> countErrorsInFile(File file) throws IOException {
        Map<String, Integer> errorsCounter = new HashMap<>();
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                if (line.contains("Error:")) {
                    String errorType = line.split("Error:")[1].trim().replaceAll("\"", "");
                    errorsCounter.put(errorType, errorsCounter.getOrDefault(errorType, 0) + 1);
                }
            }
        }
        return errorsCounter;
    }

    public static Map<String, Integer> mergeCounters(List<Map<String, Integer>> miniFileCounts) {
        Map<String, Integer> globalErrorsCount = new HashMap<>();
        for (Map<String, Integer> miniFileCount : miniFileCounts) {
            for (Map.Entry<String, Integer> entry : miniFileCount.entrySet()) {
                globalErrorsCount.put(entry.getKey(), globalErrorsCount.getOrDefault(entry.getKey(), 0) + entry.getValue());
            }
        }
        return globalErrorsCount;
    }

    public static List<Map.Entry<String, Integer>> TopNErrors(Map<String, Integer> errorCounts, int n) {
        PriorityQueue<Map.Entry<String, Integer>> minHeap = new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));
        for (Map.Entry<String, Integer> entry : errorCounts.entrySet()) {
            minHeap.add(entry);
            if (minHeap.size() > n) {
                minHeap.poll();
            }
        }
        List<Map.Entry<String, Integer>> topErrors = new ArrayList<>(minHeap);
        topErrors.sort((a, b) -> Integer.compare(b.getValue(), a.getValue()));
        return topErrors;
    }

}
