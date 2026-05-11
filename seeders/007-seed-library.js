"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		/**
		 * ATTENTION: Replace 'USER_ID_FROM_USERS_TABLE' with
		 * a UUID that actually exists in the 'users' table.
		 */
		const activeUserId = "USER_ID_FROM_USERS_TABLE";

		// Define static UUIDs for books so we can link them to requests
		const bookIds = {
			algo: "110e8400-e29b-41d4-a716-446655440001",
			cleanCode: "220e8400-e29b-41d4-a716-446655440002",
			patterns: "330e8400-e29b-41d4-a716-446655440003",
		};

		// ─── Seed Inventory ──────────────────────────────────────────────────
		await queryInterface.bulkInsert("library_books", [
			{
				id: bookIds.algo,
				title: "Introduction to Algorithms",
				author: "Cormen, Leiserson, Rivest & Stein",
				isbn: "978-0-262-03384-8",
				category: "Computer Science",
				availableCopies: 3,
				totalCopies: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: bookIds.cleanCode,
				title: "Clean Code",
				author: "Robert C. Martin",
				isbn: "978-0-13-235088-4",
				category: "Software Engineering",
				availableCopies: 1,
				totalCopies: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: bookIds.patterns,
				title: "Design Patterns",
				author: "Gang of Four",
				isbn: "978-0-201-63361-0",
				category: "Software Engineering",
				availableCopies: 2,
				totalCopies: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		// ─── Seed Initial Request/Loan ────────────────────────────────────────
		await queryInterface.bulkInsert("library_requests", [
			{
				id: "990e8400-e29b-41d4-a716-446655440999",
				userId: activeUserId,
				bookId: bookIds.algo,
				status: "approved",
				requestDate: new Date("2026-03-30"),
				approvedDate: new Date("2026-03-31"),
				dueDate: new Date("2026-04-30"),
				durationDays: 30,
				physicalCopyPickedUp: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("library_requests", null, {});
		await queryInterface.bulkDelete("library_books", null, {});
	},
};
