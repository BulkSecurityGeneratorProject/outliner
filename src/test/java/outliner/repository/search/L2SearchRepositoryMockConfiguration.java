package outliner.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of L2SearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class L2SearchRepositoryMockConfiguration {

    @MockBean
    private L2SearchRepository mockL2SearchRepository;

}
