package com.atxaustin.initiativerollapp.config

import com.atxaustin.initiativerollapp.model.DiceRoll
import com.atxaustin.initiativerollapp.model.PlayerEvent
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.admin.NewTopic
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.kafka.common.serialization.StringSerializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.annotation.EnableKafka
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.core.ProducerFactory
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.config.TopicBuilder
import org.springframework.kafka.support.serializer.JsonDeserializer
import org.springframework.kafka.support.serializer.JsonSerializer
import org.springframework.kafka.core.DefaultKafkaConsumerFactory
import org.springframework.kafka.core.DefaultKafkaProducerFactory

@Configuration
@EnableKafka
class KafkaConfig {

    //Topics
    @Bean
    fun diceRollsTopic(): NewTopic {
        return TopicBuilder.name("dice-rolls")
            .partitions(3)
            .replicas(1)
            .build()
    }

    @Bean
    fun playerEventsTopic(): NewTopic {
        return TopicBuilder.name("player-events")
            .partitions(3)
            .replicas(1)
            .build()
    }

    @Bean
    fun producerFactory(): ProducerFactory<String, Any> {
        val configProps = mapOf(
            ProducerConfig.BOOTSTRAP_SERVERS_CONFIG to "localhost:29092",
            ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG to StringSerializer::class.java,
            ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG to JsonSerializer::class.java,
        )
        return DefaultKafkaProducerFactory(configProps)
    }

    // Producer Config for sending messages
    @Bean
    fun kafkaTemplate(producerFactory: ProducerFactory<String, Any>): KafkaTemplate<String, Any> {
        return KafkaTemplate(producerFactory)
    }

    // Consumer Factory for DiceRoll
    @Bean
    fun diceRollConsumerFactory(): ConsumerFactory<String, DiceRoll> {
        val deserializer = JsonDeserializer(DiceRoll::class.java).apply {
            setRemoveTypeHeaders(false)
            addTrustedPackages("*")
            setUseTypeMapperForKey(true)
        }

        val props = mapOf(
            ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG to "localhost:29092",
            ConsumerConfig.GROUP_ID_CONFIG to "initiative-group",
            ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java,
            ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG to deserializer
        )

        return DefaultKafkaConsumerFactory(props, StringDeserializer(), deserializer)
    }

    // Kafka Listener Container Factory for DiceRoll
    @Bean
    fun diceRollKafkaListenerContainerFactory(): ConcurrentKafkaListenerContainerFactory<String, DiceRoll> {
        val factory = ConcurrentKafkaListenerContainerFactory<String, DiceRoll>()
        factory.consumerFactory = diceRollConsumerFactory()
        return factory
    }

    // Consumer Factory for PlayerEvent
    @Bean
    fun playerEventConsumerFactory(): ConsumerFactory<String, PlayerEvent> {
        val deserializer = JsonDeserializer(PlayerEvent::class.java).apply {
            setRemoveTypeHeaders(false)
            addTrustedPackages("*")
            setUseTypeMapperForKey(true)
        }

        val props = mapOf(
            ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG to "localhost:29092",
            ConsumerConfig.GROUP_ID_CONFIG to "initiative-group",
            ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java,
            ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG to deserializer
        )

        return DefaultKafkaConsumerFactory(props, StringDeserializer(), deserializer)
    }

    // Kafka Listener Container Factory for PlayerEvent
    @Bean
    fun playerEventKafkaListenerContainerFactory(): ConcurrentKafkaListenerContainerFactory<String, PlayerEvent> {
        val factory = ConcurrentKafkaListenerContainerFactory<String, PlayerEvent>()
        factory.consumerFactory = playerEventConsumerFactory()
        return factory
    }
}
