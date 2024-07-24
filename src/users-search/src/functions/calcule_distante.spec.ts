import {
    Coordinates,
    haversineDistance,
} from "../../../helpers/coordinates_distance";
import { calcule_distance } from "./calcule_distance";

// Mock the Coordinates and haversineDistance if needed
jest.mock("../../../helpers/coordinates_distance", () => {
    return {
        Coordinates: jest.fn(),
        haversineDistance: jest.fn(),
    };
});

describe("calcule_distance", () => {
    it("should calculate the distance between two valid coordinates", () => {
        const cords1 = { latitude: 40.7128, longitude: -74.006 }; // New York
        const cords2 = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles

        const user1_coords = new Coordinates(cords1.latitude, cords1.longitude);
        const user2_coords = new Coordinates(cords2.latitude, cords2.longitude);

        // Mock the distance calculation
        const mockDistance = 3940; // Example distance in km
        (haversineDistance as jest.Mock).mockReturnValue(mockDistance);

        const distance = calcule_distance({ cords1, cords2 });
        expect(distance).toBe(mockDistance);
        expect(Coordinates).toHaveBeenCalledWith(
            cords1.latitude,
            cords1.longitude
        );
        expect(Coordinates).toHaveBeenCalledWith(
            cords2.latitude,
            cords2.longitude
        );
        expect(haversineDistance).toHaveBeenCalledWith(
            user1_coords,
            user2_coords
        );
    });

    it("should throw an error if cords1 has null latitude or longitude", () => {
        const cords1 = { latitude: null, longitude: -74.006 };
        const cords2 = { latitude: 34.0522, longitude: -118.2437 };

        expect(() => calcule_distance({ cords1, cords2 })).toThrow(
            "Coordinates are incomplete or null"
        );
    });

    it("should throw an error if cords1 has null latitude or longitude", () => {
        const cords1 = { latitude: null, longitude: null };
        const cords2 = { latitude: 34.0522, longitude: -118.2437 };

        expect(() => calcule_distance({ cords1, cords2 })).toThrow(
            "Coordinates are incomplete or null"
        );
    });

    it("should throw an error if cords1 has null latitude or longitude", () => {
        const cords1 = { latitude: null, longitude: null };
        const cords2 = { latitude: null, longitude: null };

        expect(() => calcule_distance({ cords1, cords2 })).toThrow(
            "Coordinates are incomplete or null"
        );
    });

    it("should throw an error if cords2 has null latitude or longitude", () => {
        const cords1 = { latitude: 40.7128, longitude: -74.006 };
        const cords2 = { latitude: 34.0522, longitude: null };

        expect(() => calcule_distance({ cords1, cords2 })).toThrow(
            "Coordinates are incomplete or null"
        );
    });
});
