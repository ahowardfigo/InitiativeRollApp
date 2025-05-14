package com.atxaustin.initiativerollapp

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.ActiveProfiles

@SpringBootTest(classes = [InitiativeRollApplication::class])
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // keeps your MySQL config
@TestPropertySource(locations = ["classpath:application-test.properties"]) // optional: test overrides
class InitiativeRollApplicationTests {

	@Test
	fun contextLoads() {
	}

}
